import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Registration, RegistrationStatus } from "~/modules/shared/constants";
import Container from "../dragable-container";
import RegistrationCard from "../registration-card";

type ExampleProps = {
  registrations: Registration[];
};

type ItemsState = {
  root: Registration[];
  container1: Registration[];
  container2: Registration[];
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "row",
};

export const Example: React.FC<ExampleProps> = ({ registrations }) => {
  const [items, setItems] = useState<ItemsState>({
    root: [],
    container1: [],
    container2: [],
  });

  const [activeItem, setActiveItem] = useState<Registration | null>(null);

  useEffect(() => {
    const inReviewItems = registrations?.filter(
      (registration) => registration.status === RegistrationStatus.REVIEW
    );

    const approvedItems = registrations?.filter(
      (registration) => registration.status === RegistrationStatus.APPROVED
    );

    const reprovedItems = registrations?.filter(
      (registration) => registration.status === RegistrationStatus.REPROVED
    );

    setItems({
      root: inReviewItems || [],
      container1: approvedItems || [],
      container2: reprovedItems || [],
    });
  }, [registrations]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id: string): keyof ItemsState | undefined => {
    return (Object.keys(items) as Array<keyof ItemsState>).find((key) =>
      items[key].some((item) => item.id === id)
    );
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    if (active) {
      const foundItem = registrations.find((item) => item.id === active.id);
      setActiveItem(foundItem ?? null);
    }
  };

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    if (!active || !over) return;

    const { id: activeId } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      const activeIndex = activeItems.findIndex((item) => item.id === activeId);
      const overIndex = overItems.findIndex((item) => item.id === overId);

      const newIndex = overIndex >= 0 ? overIndex : overItems.length;

      return {
        ...prev,
        [activeContainer]: activeItems.filter((item) => item.id !== activeId),
        [overContainer]: [
          ...overItems.slice(0, newIndex),
          activeItems[activeIndex],
          ...overItems.slice(newIndex),
        ],
      };
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!active || !over) return;

    const { id: activeId } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = items[activeContainer].findIndex((item) => item.id === activeId);
    const overIndex = items[overContainer].findIndex((item) => item.id === overId);

    if (activeIndex !== overIndex) {
      setItems((prev) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveItem(null);
  };

  return (
    <div style={wrapperStyle}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Container id="root" items={items.root} />
        <Container id="container1" items={items.container1} />
        <Container id="container2" items={items.container2} />
        <DragOverlay>
          {activeItem ? <RegistrationCard registration={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

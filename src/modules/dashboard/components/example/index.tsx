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
import { Registration, RegistrationStatus, RegistrationStatusKeys } from "~/modules/shared/constants";
import Container from "../dragable-container";
import RegistrationCard from "../registration-card";
import { useUpdateRegistrationMutation } from "../../mutations/use-update-registration-mutation";

type ExampleProps = {
  registrations: Registration[];
};

type ItemsState = {
  reviewRoot: Registration[];
  approvedRoot: Registration[];
  reprovedRoot: Registration[];
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "row",
};

export const Example: React.FC<ExampleProps> = ({ registrations }) => {
  const [items, setItems] = useState<ItemsState>({
    reviewRoot: [],
    approvedRoot: [],
    reprovedRoot: [],
  });

  const [activeItem, setActiveItem] = useState<Registration | null>(null);

  const updateRegistration = useUpdateRegistrationMutation(); // Initialize the mutation

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
      reviewRoot: inReviewItems || [],
      approvedRoot: approvedItems || [],
      reprovedRoot: reprovedItems || [],
    });
  }, [registrations]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Modify findContainer to check both the items and the container ID directly
  const findContainer = (id: string): keyof ItemsState | undefined => {
    if (id in items) {
      return id as keyof ItemsState;
    }
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

    // Update the registration status based on the new container
    let newStatus: RegistrationStatusKeys;
    if (overContainer === "reviewRoot") {
      newStatus = RegistrationStatus.REVIEW;
    } else if (overContainer === "approvedRoot") {
      newStatus = RegistrationStatus.APPROVED;
    } else if (overContainer === "reprovedRoot") {
      newStatus = RegistrationStatus.REPROVED;
    }

    // Trigger the mutation to update the registration status
    const updatedRegistration = {
      ...activeItem,
      status: newStatus,
    };

    updateRegistration.mutate(updatedRegistration);

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
        <Container id="reviewRoot" items={items.reviewRoot} />
        <Container id="approvedRoot" items={items.approvedRoot} />
        <Container id="reprovedRoot" items={items.reprovedRoot} />
        <DragOverlay>
          {activeItem ? <RegistrationCard registration={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

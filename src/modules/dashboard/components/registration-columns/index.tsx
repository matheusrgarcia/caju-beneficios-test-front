import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  Active,
  Over,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
  Registration,
  RegistrationStatus,
  RegistrationStatusKeys,
} from "~/modules/shared/constants";
import { DraggableContainer } from "../dragable-container";
import RegistrationCard from "../registration-card";

import * as S from "./styles";
import { useUpdateRegistrationMutation } from "../../mutations/use-update-registration-mutation";
import useScreenSize from "~/modules/shared/utils/useScreenSize";

type RegistrationColumnsProps = {
  registrations: Registration[];
};

type ItemsState = {
  reviewRoot: Registration[];
  approvedRoot: Registration[];
  reprovedRoot: Registration[];
};

export const RegistrationColumns: React.FC<RegistrationColumnsProps> = ({
  registrations,
}) => {
  const { isDesktop } = useScreenSize();
  const [items, setItems] = useState<ItemsState>({
    reviewRoot: [],
    approvedRoot: [],
    reprovedRoot: [],
  });

  const [activeItem, setActiveItem] = useState<Registration | null>(null);

  const updateRegistration = useUpdateRegistrationMutation();

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

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: isDesktop ? { distance: 10 } : { distance: Infinity },
  });

  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  const sensors = [pointerSensor, keyboardSensor];

  const findContainer = (
    id: UniqueIdentifier
  ): keyof ItemsState | undefined => {
    if (id in items) {
      return id as keyof ItemsState;
    }
    return (Object.keys(items) as Array<keyof ItemsState>).find((key) =>
      items[key].some((item) => item.id === id)
    );
  };

  const handleDragStart = (event: { active: Active }): void => {
    const { active } = event;
    if (active) {
      const foundItem = registrations.find((item) => item.id === active.id);
      setActiveItem(foundItem ?? null);
    }
  };

  const handleDragOver = (event: {
    active: Active;
    over: Over | null;
  }): void => {
    const { active, over } = event;
    if (!active || !over) return;

    const { id: activeId } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
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

  const handleDragEnd = (event: {
    active: Active;
    over: Over | null;
  }): void => {
    const { active, over } = event;
    if (!active || !over) return;

    const { id: activeId } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].findIndex(
      (item) => item.id === activeId
    );
    const overIndex = items[overContainer].findIndex(
      (item) => item.id === overId
    );

    if (activeIndex !== overIndex) {
      setItems((prev) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
      }));
    }

    if (!activeItem || !activeItem.id) {
      return;
    }

    let newStatus: RegistrationStatusKeys | undefined;
    if (overContainer === "reviewRoot") {
      newStatus = RegistrationStatus.REVIEW;
    } else if (overContainer === "approvedRoot") {
      newStatus = RegistrationStatus.APPROVED;
    } else if (overContainer === "reprovedRoot") {
      newStatus = RegistrationStatus.REPROVED;
    }

    const updatedRegistration = {
      ...activeItem,
      status: newStatus,
      id: activeItem.id,
    };

    updateRegistration.mutate(updatedRegistration);

    setActiveItem(null);
  };

  return (
    <S.Container>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <DraggableContainer
          id="reviewRoot"
          key="reviewRoot"
          items={items.reviewRoot}
          status={RegistrationStatus.REVIEW}
        />
        <DraggableContainer
          id="approvedRoot"
          key="approvedRoot"
          items={items.approvedRoot}
          status={RegistrationStatus.APPROVED}
        />
        <DraggableContainer
          id="reprovedRoot"
          key="reprovedRoot"
          items={items.reprovedRoot}
          status={RegistrationStatus.REPROVED}
        />
        <DragOverlay>
          {activeItem ? (
            <RegistrationCard registration={activeItem} key={activeItem.id} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </S.Container>
  );
};

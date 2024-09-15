import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  Registration,
  RegistrationStatusKeys,
} from "~/modules/shared/constants";

import { SortableItem } from "../sortable-item";
import { RegistrationCard } from "../registration-card";
import { dashboardColumnTitles } from "../../constants";

import * as S from "./styles";

type DraggableContainerProps = {
  id: string;
  items: Registration[];
  status: RegistrationStatusKeys;
};

export const DraggableContainer: React.FC<DraggableContainerProps> = ({
  id,
  items,
  status,
}) => {
  const { setNodeRef } = useDroppable({ id });

  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <SortableContext
      id={id}
      items={items.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <S.DragContainer ref={setNodeRef} status={status}>
        <S.TitleColumn status={status}>
          {dashboardColumnTitles[status]}
        </S.TitleColumn>
        {items.length === 0 ? (
          <p>Sem candidatos</p>
        ) : (
          items.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <RegistrationCard registration={item} />
            </SortableItem>
          ))
        )}
      </S.DragContainer>
    </SortableContext>
  );
};

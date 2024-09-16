import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Skeleton } from "@mui/material";

import { Registration, RegistrationStatusKeys } from "~/modules/shared/types";

import { SortableItem } from "../sortable-item";
import { RegistrationCard } from "../registration-card";
import { dashboardColumnTitles } from "../../constants";

import * as S from "./styles";

import { isEmpty } from "lodash";

type DraggableContainerProps = {
  id: string;
  items: Registration[];
  status: RegistrationStatusKeys;
  isLoading: boolean;
};

export const DraggableContainer: React.FC<DraggableContainerProps> = ({
  id,
  items,
  status,
  isLoading,
}) => {
  const { setNodeRef } = useDroppable({ id });

  if (isLoading) {
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
          <Skeleton variant="rounded" animation="wave" height={60} />
          <Skeleton variant="rounded" height={60} />
          <Skeleton variant="rounded" height={60} />
        </S.DragContainer>
      </SortableContext>
    );
  }

  if (isEmpty(items)) {
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
          <p>Sem candidatos no momento</p>
        </S.DragContainer>
      </SortableContext>
    );
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
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            <RegistrationCard registration={item} />
          </SortableItem>
        ))}
      </S.DragContainer>
    </SortableContext>
  );
};

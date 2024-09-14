import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableItem from "../sortable-item";
import RegistrationCard from "../registration-card";

const containerStyle = {
  background: "#dadada",
  padding: 10,
  margin: 10,
  flex: 1,
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Container({ id, items }) {
  const { setNodeRef } = useDroppable({
    id,
  });

  if (!items) {
    return <div>Loading</div>;
  }

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} style={containerStyle}>
        {items &&
          items?.map((item) => (
            <SortableItem key={item} id={item.id}>
              <RegistrationCard registration={item} />
            </SortableItem>
          ))}
      </div>
    </SortableContext>
  );
}

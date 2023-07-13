import React from "react";

export interface Action {
  type: string;
  payload: object;
}

export interface DefaultProps {
  children: React.ReactNode;
}

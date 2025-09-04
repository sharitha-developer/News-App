// useModal.js
import { useContext } from "react";
import { ModalContext } from "../components/store/ModalContext";

export function useModal() {
  return useContext(ModalContext);
}
import { useState } from "react";
import { ModalContext } from "../store/ModalContext";
export default function ModalProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  function openModal(article) {
    setIsModalOpen(true);
    setSelectedArticle(article);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedArticle(null);
  }

  return (
    <ModalContext.Provider
      value={{ isModalOpen, selectedArticle, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}
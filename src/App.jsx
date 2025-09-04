import React from "react";
import ModalProvider from './components/UI/ModalProvider'

import News from "./components/News";
import NewsModal from "./components/NewsModal";

const App = () => {
  return (
    <div className="container">
      <ModalProvider>
        <News />
        <NewsModal />
      </ModalProvider>
    </div>
  );
};

export default App;

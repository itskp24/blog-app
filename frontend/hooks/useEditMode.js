import { createContext, useContext } from 'react';

const EditContext = createContext();

export function useEditMode() {
  return useContext(EditContext);
}

export function EditProvider({ children, value }) {
  return (
    <EditContext.Provider value={value}>
      {children}
    </EditContext.Provider>
  );
}

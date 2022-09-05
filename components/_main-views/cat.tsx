import { PropsWithChildren } from "react";

interface ICatProps extends PropsWithChildren { }

const Cat: React.FC<ICatProps> = ({ children }) => (
  <>{ children }</>
);

export default Cat;
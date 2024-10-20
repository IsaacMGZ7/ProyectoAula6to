import PropTypes from "prop-types";
import Navbar from "../components/Navbar";

export const TemplatePrincipal = ({ children }) => {
  return (
    <main className="w-[85%] m-auto before:content before:w-full before:h-screen before:bg-gradient-to-r from-emerald-50 to-gray-50 before:fixed before:top-0 before:left-0 before:-z-30">
      <Navbar />
      {children}
    </main>
  );
};

TemplatePrincipal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePrincipal;

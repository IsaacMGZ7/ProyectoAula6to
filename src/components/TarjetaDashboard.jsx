import PropTypes from "prop-types";

const TarjetaDashboard = ({ titulo, icon, cantidad, monto }) => {
  return (
    <div className="border p-4 rounded-xl bg-white grid gap-3 cursor-pointer hover:shadow-lg transition duration-300 ease-in-out hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700 dark:hover:shadow-xl">
      <div className="flex justify-between">
        <h3 className="text-xl">{titulo}</h3>
        <img className="w-6 h-6" src={icon} alt={titulo} />
      </div>
      <span>
        <p>{cantidad}</p>
        <p className="text-slate-400 text-lg">{monto}</p>
      </span>
    </div>
  );
};

TarjetaDashboard.propTypes = {
  titulo: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  cantidad: PropTypes.string.isRequired,
  monto: PropTypes.string.isRequired,
};

export default TarjetaDashboard;

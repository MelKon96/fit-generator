type OverlayProps = {
  isOpen: boolean;
  onClick: () => void;
};
const Overlay = ({ isOpen, onClick }: OverlayProps) => <div onClick={onClick} className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} />;

export default Overlay;

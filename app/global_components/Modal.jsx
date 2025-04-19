const Modal = ({ handleClose, first, second, isOpen }) => {
  return (
    isOpen && (
      <div className="bg-[#00000070]  absolute h-screen w-screen flex justify-center items-center z-50">
        <div className="p-10 box-border relative bg-background rounded-[15px]">
          {handleClose && (
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <img src="/UI/close.png" className="h-6" alt="" />
            </button>
          )}
          <img src="/UI/Green.png" className="h-52 mx-auto" alt="" />
          <h5 className="text-2xl font-semibold text-center mt-2">Great!</h5>
          <p className="text-center text-[16px] font-normal mt-2">
            Congratulations. You have successfully <br /> registered your
            account.
          </p>
          {first && (
            <button className="w-full btn btn-primary mt-5" onClick={first}>
              Continue
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Modal;

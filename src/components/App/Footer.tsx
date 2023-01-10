export const Footer = () => {
  const scrollTop = async () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <footer className="text-muted text-center py-5">
      <div className="container">
        <p className="float mb-3">
          <button type="button" className="btn btn-link link-dark" onClick={scrollTop}>
            Back to top
          </button>
        </p>
        <p className="mb-0">Copyright ©2022 by SELAB. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

import React from "react";
import Link from "./Link";
const Header = () => {
  return (
    <div className="ui secondarypointing menu">
      <Link href="/" className="item">
        Path finding
      </Link>
      {/* <Link href="/testpage" className="item">
        test page
      </Link> */}
      <Link href="/sortingvisualizer" className="item">
        sorting visualizer
      </Link>
    </div>
  );
};

export default Header;

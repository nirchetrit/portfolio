import React from "react";
import Link from "./Link";
const Header = () => {
  return (
    <div className="ui secondarypointing menu">
      <Link href="/" className="item">
        Accordion
      </Link>
      <Link href="/list" className="item">
        list
      </Link>
      <Link href="/dropdown" className="item">
        dropdown
      </Link>
      <Link href="/translate" className="item">
        translate
      </Link>
      <Link href="/pathfinding" className="item">
        path finding
      </Link>
      <Link href="/testpage" className="item">
        test page
      </Link>
      <Link href="/sortingvisualizer" className="item">
        sorting visualizer
      </Link>
    </div>
  );
};

export default Header;

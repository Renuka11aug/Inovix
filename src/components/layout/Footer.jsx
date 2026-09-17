import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <span>&copy; {new Date().getFullYear()} Nosh Campus Food. All rights reserved.</span>
      <div>
        <a href="#">Help</a>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
      </div>
    </footer>
  );
}

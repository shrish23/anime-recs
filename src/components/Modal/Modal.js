import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";

function Modals({ openprop }) {
  return (
    <Dialog open={openprop}>
      <DialogTitle>
        <div>TITLE</div>
      </DialogTitle>
      <DialogContent>
        <div>CONTENT</div>
      </DialogContent>
    </Dialog>
  );
}

export default Modals;

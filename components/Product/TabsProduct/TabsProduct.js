import React from "react";
import { Tab } from "semantic-ui-react";
import InfoProduct from "../InfoProduct/InfoProduct";

export default function TabsProduct(props) {
  const { product } = props;

  //confifuración de taps para la información
  const panes = [
    {
      menuItem: "informacón",
      render: () => (
        <Tab.Pane>
          <InfoProduct product={product} />
        </Tab.Pane>
      ),
    },
  ];

  return <Tab className="tabs-product" panes={panes} />;
}

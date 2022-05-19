import { Modal, Icon } from "semantic-ui-react";
export default function BasicModal(props) {
  const { show, setShow, title, children, ...rest } = props; // ...rest es para recibir las clases de cualquier parte del padre
  //...rest es para manejar los errores del que se recibe del index para recibir de donde venga lo validarea en la clase que se use el ..rest
  const onClose = () => setShow(false);

  return (
    <Modal className="basic-modal" open={show} onClose={onClose} {...rest}>
      <Modal.Header>
        <span>{title}</span> <Icon name="close" onClick={onClose} />
      </Modal.Header>
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
}

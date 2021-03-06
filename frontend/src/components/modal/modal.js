import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import EventUpdateFormContainer from '../event/event_update_form_container';
import GroupUpdateFormContainer from '../group/group_update_form_container';

const Modal = ({ modal, closeModal }) => {
  if(!modal) return null;
  let component;
  switch (modal) {
    case 'eventUpdate':
      component = <EventUpdateFormContainer />;
      break;
    case 'groupUpdate':
      component = <GroupUpdateFormContainer />;
      break;
    default:
      return null;
  }

  return(
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
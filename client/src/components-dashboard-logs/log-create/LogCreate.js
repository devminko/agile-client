import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdInfoOutline, MdKeyboardReturn } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';

import { createLog } from '../../redux/log/log.actions';
import { resetLogState } from '../../redux/dashboard/dashboard.actions';

import Button from '../../components/button/Button';
import FormInput from '../../components/form-input/FormInput';

import style from './log-create.module.scss';

// *************************** LOG CREATE COMPONENT *************************** //
const LogCreate = ({ client, createLog, resetLogState }) => {
  const [ formData, setFormData ] = useState({
    type: '',
    details: '',
    log_date: '',
    associated_client: client.id,
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await createLog(formData);
    setFormData({
      type: '',
      details: '',
      log_date: '',
      associated_client: client.id,
    });
  };

  return (
    <div className={style.logCreate}>
      <h2 className={style.header}>Create Meeting</h2>

      <form className={style.form} onSubmit={onSubmit}>

        <label className={style.formLabel}>
          Log / Meeting Type <span className={style.requiredText}>(required)</span>
        </label>
        <div className={style.inputContainer}>
          <MdInfoOutline className={style.inputIcon} />
          <FormInput 
            type='text'
            name='type'
            placeholder='Type'
            autoComplete='off'
            value={formData.type}
            onChange={onChange}
            required
            clientInput
          />
        </div>

        <label className={style.formLabel}>Date</label>
        <div className={style.inputContainer}>
          <FaRegCalendarAlt className={style.inputIcon} />
          <FormInput 
            type='date'
            name='log_date'
            placeholder='Date'
            autoComplete='off'
            value={formData.log_date}
            onChange={onChange}
          />
        </div>

        <label className={style.formLabel}>Details</label>
        <textarea 
          type='textarea'
          name='details'
          placeholder='Details'
          autoComplete='off'
          value={formData.details}
          onChange={onChange}
          className={style.textArea}
        />

        <Button type='submit' clientButton>Create</Button>
      </form>

      <div className={style.returnContainer} onClick={() => resetLogState()}>
        <MdKeyboardReturn className={style.returnIcon} aria-label='Return to Client' />
        <p className={style.returnText}>Return to Client</p>
      </div>

    </div>
  )
};

// PROP TYPES
LogCreate.propTypes = {
  client: PropTypes.object,
  createLog: PropTypes.func.isRequired,
  resetLogState: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  client: state.clients.client,
})

const mapDispatchToProps = (dispatch) => ({
  createLog: ({type, details, associated_client}) => dispatch(createLog({type, details, associated_client})),
  resetLogState: () => dispatch(resetLogState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogCreate);
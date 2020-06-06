import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MdEmail, MdPhoneInTalk, MdEdit } from 'react-icons/md';

import { getAllCompanies, getCompany } from '../../redux/company/company.actions';

import ClientItem from '../client-item/ClientItem';
import ClientEdit from '../client-edit/ClientEdit';
import CompanyItem from '../../components-dashboard-company/company-item/CompanyItem';
import LogItem from '../../components-dashboard-logs/log-item/LogItem';

import style from './client-page.module.scss';

// *************************** CLIENT PAGE COMPONENT *************************** //
const ClientPage = ({ client, companies, getAllCompanies, getCompany }) => {
  // 'client' object passed as prop from 'DashboardPage.js'
  const { id, first_name, last_name, email, phone_number, job_title, notes, client_company, logs, loading } = client;

  const [ editClient, setEditClient ] = useState(false);
  const onClickEditClient = () => {
    setEditClient(!editClient);
  };

  useEffect(() => {
    getAllCompanies()
  }, []);

  // Loop through 'companies' and set 'currentCompany' if matches 'client.id' 
  companies.map(company => {
    if (company.associated_client === client.id) {
      getCompany(company.id);
    }
  });

  // Render Client Info to page
  const clientInfo = (
    <div className={style.clientPage}>
      
      <div className={style.clientHeader}>
        <div className={style.nameContainer}>
          <h2 className={style.clientName}>{first_name} {last_name}</h2>
          <div className={style.jobTitleContainer}>
            <p className={style.jobTitle}>{job_title}</p>
            <div className={style.iconContainer} onClick={() => onClickEditClient()}>
              <MdEdit className={style.editIcon} />
              <span className={style.editText}>Edit</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={style.sectionContainer}>
        <h3 className={style.sectionTitle}>Contact Info</h3>
        <div className={style.infoContainer}>
          <MdPhoneInTalk aria-label='Phone Number' className={style.icon} />
          <p className={style.infoText}>
            {phone_number ? phone_number : 'N/A'}
          </p>
        </div>
        <div className={style.infoContainer}>
          <MdEmail aria-label='Email Address' className={style.icon} />
          <p className={style.infoText}>
            {email ? email : 'N/A'}
          </p>
        </div>
      </div>

      <div className={style.sectionContainer}>
        <h3 className={style.sectionTitle}>Notes</h3>
        <p className={style.noteText}>
          { notes ? notes : 'No client notes added...'}
        </p>
      </div>

      <div className={style.sectionContainer}>
        <h3 className={style.sectionTitle}>Company Info</h3>
        <CompanyItem client={client} />
      </div>

      <div className={style.sectionContainer}>
        <h3 className={style.sectionTitle}>Recent Logs</h3>
        <LogItem client={client} />
      </div>

    </div>
  );

  // Render 'ClientEdit.js' component if editClient === true
  const renderClientEdit = (
    <div className={style.clientPage}>
      <div className={style.clientHeader}>
        <div className={style.nameContainer}>
          <h2 className={style.clientName}>{first_name} {last_name}</h2>
          <div className={style.jobTitleContainer}>
            <p className={style.jobTitle}>{job_title}</p>
            <div className={style.iconContainer} onClick={() => onClickEditClient()}>
              <MdEdit className={style.editIcon} />
              <span className={style.editText}>Return to Client</span>
            </div>
          </div>
        </div>
      </div>
      <ClientEdit />
    </div>
  );

  // Final render options for screen
  const renderToScreen = (
    editClient ? renderClientEdit : clientInfo
  );

  return (
    loading ? <p>Loading...</p> : renderToScreen
  )
};

// PROP TYPES
ClientPage.propTypes = {
  client: PropTypes.object.isRequired,
  companies: PropTypes.array,
  getAllCompanies: PropTypes.func.isRequired,
  getCompany: PropTypes.func.isRequired,
};

// REDUX
const mapStateToProps = (state) => ({
  companies: state.company.companies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCompanies: () => dispatch(getAllCompanies()),
  getCompany: (companyId) => dispatch(getCompany(companyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
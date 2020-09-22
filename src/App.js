import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';

import CalendarIcon from './assets/icon_calendar.svg';
import SearchIcon from './assets/icon_search.svg';
import LogoIcon from './assets/logo.png';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


import Divider from '@material-ui/core/Divider';
import MaterialTable from 'material-table';
import faker from 'faker';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  DateRangePicker,
  DateRangeDelimiter,
  LocalizationProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@material-ui/pickers/adapter/date-fns";

class DataModel {
  constructor(from, to, subject, date, body, attachment) {
    this.from = from;
    this.to = to;
    this.subject = subject;
    this.date = date;
    this.body = body;
    this.attachment = attachment;
  }
};

const useStyles = makeStyles((theme) => ({
  textBox: {
    margin: theme.spacing(1),
    width: 250,
    padding: 15
  },
  inputRoot: {
    width: 250,
    borderRadius: '10px 0px 0px 10px',
    '& #input-with-icon-textfield': {
      textAlign: 'center',
      // background: 'purple'
    }
  }
}));

export default function BasicDateRangePicker() {
  const [selectedDate, setDateChange] = React.useState([new Date(), new Date()]);
  const [data, setData] = React.useState([]);

  const generateData = () => {
    const generated = [];

    for (let i = 0; i < 10; i++) {
      generated.push(new DataModel(
        /*from*/  faker.internet.email(),
        /*to*/    faker.internet.email(),
        /*subj*/  faker.fake("{{lorem.sentence}}"),
        /*date*/  faker.fake("{{date.recent}}"),
        /*body*/  faker.fake("{{lorem.text}}"),
        /*attach*/Math.floor(Math.random() * 3)
      ));
    };

    //console.log('generated data: ', generated);
    setData(data.concat(generated));
  };

  const handleDataRangeChange = (dates) => {
    setDateChange(dates);

    console.log('changed dates ', dates);
  };

  //console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));
  const classes = useStyles();

  return (
    <div style={styles.main}>
      <LocalizationProvider dateAdapter={DateFnsUtils}>
        <DateRangePicker
          // startText="Check-in"
          // endText="Check-out"
          value={selectedDate}
          onChange={date => handleDataRangeChange(date)}
          renderInput={(startProps, endProps) => {
            // console.log(startProps);
            const {
              label, onBlur, onChange, onFocus,
              ref, placeholder, variant
            } = startProps;

            return (
            <>
              <TextField
                onBlur={onBlur}
                // onChange={onChange}
                onFocus={onFocus}

                className={classes.textBox}
                variant={"outlined"}
                value={`${startProps.value} - ${endProps.value}`}
                id="input-with-icon-textfield"
                // label={label}
                InputProps={{
                  className: classes.inputRoot,
                  startAdornment: (
                    <div>
                      <InputAdornment position="start">
                        <img src={CalendarIcon} alt="calendarIcon" style={{ width: 25, height: 25 }} />
                      </InputAdornment>

                      <InputAdornment
                        style={{
                          position: 'absolute',
                          textAlign: 'center',
                          right: -74.1,
                          top: 0,
                          background: '#EBEBEB',
                          height: 50, width: 50,
                          padding: 11,
                          display: 'flex',
                          justifyContent: 'center',
                          borderRadius: '0px 10px 10px 0px',
                          border: '1px solid silver',
                          cursor: 'pointer'
                        }}
                        onClick={() => generateData()}
                      >
                        <img src={SearchIcon} alt="calendarIcon" style={{ width: 25, height: 25 }} />
                      </InputAdornment>
                    </div>

                  ),
                }}
              />
            </>
          )}}
        />
      </LocalizationProvider>

      <div>
        <p style={styles.paragraph}>
          Results: {data.length} mail(s)
        </p>

        <Divider style={{ margin: 25 }} />

        {
          (data.length) ?
            <MaterialTable
              columns={[
                { title: 'From', field: 'from' },
                { title: 'To', field: 'to' },
                { title: '', field: 'attachment' },
                { title: 'Subject', field: 'subject' },
                { title: '', field: 'attachment' },
                { title: 'Date', field: 'date' },
              ]}
              data={data}
              title="Detail Panel With RowClick Preview"
              detailPanel={rowData => {
                return (
                  <p style={{ margin: 0, padding: 50, height: 115, background: '#EBEBEB' }}>
                    {rowData.body}
                  </p>
                )
              }}
              onRowClick={(event, rowData, togglePanel) => togglePanel()}
              icons={tableIcons}
              options={{
                showTitle: false,
                search: false,
                headerStyle: {
                  padding: 10, margin: 0,
                  backgroundColor: '#EBEBEB',
                  fontWeight: 'bold',
                  color: 'gray'
                },
                rowStyle: {
                  padding: 0,
                  margin: 0,
                  height: 20
                }
              }}
              components={{
                  Toolbar: props => (
                      <div style={{ backgroundColor: '#e8eaf5' }}>
                          {/* <MTableToolbar {...props} /> */}
                      </div>
                  )
              }}
            /> :

            <div style={styles.tableContainerStyle}>
              <img src={LogoIcon} alt='logo' style={{ height: 150 }} />
            </div>
        }

      </div>


    </div>
  );
}

const styles = {
  main: {
    width: '100%',
    height: 800,
    //background: 'silver'
  },
  tableContainerStyle: {
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    //background: 'silver'
  },
  paragraph: {
    fontWeight: 'bold',
    marginLeft: 25,
    color: 'gray'
  }
};

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

import { Table } from "reactstrap";
import { FaTrash } from "react-icons/fa";

const BirthdayTable = ({ birthdays }) => {
  const date = new Date()
  return (
    <Table responsive>
      <thead>
        <th>S/N</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Date of Birth</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Phone Number</th>
        <th>Delete</th>
      </thead>
      <tbody>
        {birthdays?.docs && birthdays?.docs.map((b, i) => {
          let date = new Date(b?.birth_date)
          return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{b?.first_name}</td>
            <td>{b?.last_name}</td>
            <td>{date && date.toLocaleDateString()}</td>
            <td>{b?.email}</td>
            <td>{b?.sex}</td>
            <td>{b?.phone}</td>
            <td><FaTrash /></td>
          </tr>
          )})}
      </tbody>
    </Table>
  );
}

export default BirthdayTable;
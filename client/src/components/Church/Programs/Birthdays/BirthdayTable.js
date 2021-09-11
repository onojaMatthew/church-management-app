import { Card, CardBody, Table } from "reactstrap";

const BirthdayTable = () => {
  return (
    <Table responsive>
      <thead>
        <th>S/N</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Date of Birth</th>
        <th>Anuversary Date</th>
        <th>Event Venue</th>
        <th>Phone Number</th>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>John</td>
          <td>Doe</td>
          <td>02/10/1988</td>
          <td>02/10/2021</td>
          <td>Moon Shine Hotel, 2, Shomolu Lagos</td>
          <td>09012345678</td>
        </tr>
        <tr>
          <td>1</td>
          <td>John</td>
          <td>Doe</td>
          <td>02/10/1988</td>
          <td>02/10/2021</td>
          <td>Moon Shine Hotel, 2, Shomolu Lagos</td>
          <td>09012345678</td>
        </tr>

        <tr>
          <td>1</td>
          <td>John</td>
          <td>Doe</td>
          <td>02/10/1988</td>
          <td>02/10/2021</td>
          <td>Moon Shine Hotel, 2, Shomolu Lagos</td>
          <td>09012345678</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default BirthdayTable;
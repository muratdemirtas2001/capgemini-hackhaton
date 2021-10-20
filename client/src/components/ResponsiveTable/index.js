import { Table } from "react-bootstrap";

import "./ResponsiveTable.css";

const ResponsiveTable = ({ headings, displayFunction, data }) => {
	return (
		<Table responsive size="sm" className="900px">
			<thead>
				<tr>
					{headings.map((heading, index) => (
						<th key={index}>{heading}</th>
					))}
				</tr>
			</thead>
			<tbody>{displayFunction(data)}</tbody>
		</Table>
	);
};

export default ResponsiveTable;

import React from "react";
import {
	Table,
	TableBody,
	TableHead,
	TableCell,
	Paper,
	TableRow,
	TableContainer,
} from "@mui/material";
import { LogiObject, Rule, Rules } from "../../types";
import "./DataTable.css";

const ruleCategories = ["Data Type", "Required", "Case", "Dependency"];

interface DataTableProps {
	object: LogiObject;
	rules: Rules;
}

const DataTable: React.FC<DataTableProps> = (props) => {
	return (
		<div id='data-table-container'>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>{props.object.objectName}</TableCell>
							{ruleCategories.map((rule) => (
								<TableCell>{rule}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{props.rules.map((rule: Rule, key) => (
							<TableRow
								key={key}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component='th' scope='row'>
									{rule.field}
								</TableCell>
								{ruleCategories.map((ruleCategory: string) => {
									const splitRuleCategory = ruleCategory.split(" ");
									splitRuleCategory[0] = splitRuleCategory[0].toLowerCase();
									const key: string = splitRuleCategory.join("");
									return (
										<TableCell component='th' scope='row'>
											{rule[key].toString().toUpperCase()}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default DataTable;

export { default as L1S1Modules } from "./semesters/L1S1Modules";
export { default as L1S2Modules } from "./semesters/L1S2Modules";
export { default as L2S3Modules } from "./semesters/L2S3Modules";
export { default as L2S4Modules } from "./semesters/L2S4Modules";
export { default as L3S5Modules } from "./semesters/L3S5Modules";
export { default as L3S6Modules } from "./semesters/L3S6Modules";
export { default as M1S1Modules } from "./semesters/M1S1Modules";
export { default as M1S2Modules } from "./semesters/M1S2Modules";
export { default as M2S1Modules } from "./semesters/M2S1Modules";
export { default as M2S2Modules } from "./semesters/M2S2Modules";

import React from "react";
import L2S3 from "./semesters/L2S3Modules";
import L2S4 from "./semesters/L2S4Modules";

// Default Modules component: render L2 semesters by default (used by YearPage when visiting /year/l2)
const ModulesDefault: React.FC<{ showHeader?: boolean }> = ({ showHeader = true }) => {
	return (
		<div className="space-y-12">
			<L2S3 showHeader={showHeader} />
			<L2S4 showHeader={showHeader} />
		</div>
	);
};

export default ModulesDefault;

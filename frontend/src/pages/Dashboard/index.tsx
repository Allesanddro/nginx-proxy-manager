import { Heading } from "@chakra-ui/react";

import { intl } from "src/locale";

function Dashboard() {
	return (
		<Heading mb={2}>{intl.formatMessage({ id: "dashboard.title" })}</Heading>
	);
}

export default Dashboard;

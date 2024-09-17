import { tabs } from "~/shared/constants"
import { Tab, TabList } from "~/shared/ui"
import { TabOption, TabType } from "~/shared/types"
import { AllCatsTab, FavoritesTab } from "~/widgets"

import "./index.css"

export function App() {
	function renderTabContent(tab: TabType) {
		return <section className={"container"}>{tab.id === TabOption.ALL ? <AllCatsTab /> : <FavoritesTab />}</section>
	}

	function renderTab(props: TabType & { onClick: () => void; isActive: boolean }) {
		return <Tab key={props.id} {...props} />
	}

	return (
		<main className={"w-full"}>
			<TabList
				renderTab={(tab, onClick, isActive) => renderTab({ ...tab, onClick, isActive })}
				renderTabContent={renderTabContent}
				tabs={tabs}
			/>
		</main>
	)
}

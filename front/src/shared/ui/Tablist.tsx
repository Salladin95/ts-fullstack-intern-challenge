import React from "react"
import { TabType } from "~/shared/types"

type TabListProps = {
	renderTabContent: (tab: TabType) => React.ReactNode
	renderTab: (tab: TabType, onClick: () => void, isActive: boolean) => React.ReactNode
	tabs: TabType[]
	defaultTab?: TabType
}

export function TabList(props: TabListProps) {
	const { renderTabContent, renderTab, defaultTab, tabs } = props
	const [activeTab, setActiveTab] = React.useState(defaultTab || tabs?.[0])

	return (
		<div className={""}>
			<ul className={"tab-list container flex"}>
				{tabs.map((tab) => renderTab(tab, () => setActiveTab(tab), activeTab?.id === tab.id))}
			</ul>
			{renderTabContent(activeTab)}
		</div>
	)
}

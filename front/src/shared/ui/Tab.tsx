import { TabType } from "~/shared/types"

type TabProps = TabType & { onClick: () => void; isActive: boolean }

export function Tab(props: TabProps) {
	return (
		<div data-active={props.isActive} className={"tab flex flex-center"} key={props.id} onClick={props.onClick}>
			{props.label}
		</div>
	)
}

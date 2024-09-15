import { TabOption, TabType } from "~/shared/types"

function createTab(id: string, label: string): TabType {
	return {
		label,
		id,
	}
}

export const tabs = [createTab(TabOption.ALL, "Все котики"), createTab(TabOption.FAVORITES, "Любимые котики")]

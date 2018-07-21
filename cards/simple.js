export const SimpleCardParameter = {
	'fontColor': { valueType: 'string', defaultValue: 'black', description: 'font color', },
	'fontSize': { widget: 'option', valueType: 'string', defaultValue: 'medium', description: 'font size', optionValues: ['small', 'medium', 'large',], },
	'alignment': { widget: 'option', valueType: 'string', defaultValue: 'center', description: 'alignment', optionValues: ['left', 'right', 'center',], },
	'iconName': { valueType: 'string', defaultValue: '', description: 'font awesome icon name. Ex: users' },
	'showTitle': { widget: 'checkbox', valueType: 'boolean', defaultValue: true, description: 'show title', },
	'prefix': { valueType: 'string', defaultValue: '', description: 'prefix', },
	'suffix': { valueType: 'string', defaultValue: '', description: 'suffix', },
}

export function renderSimpleCard(rows, column, parameter) {
	if (rows.length == 0) {
		return `<div style="text-align: center; font-size: 18px;">Empty rows. Please check the output.</div>`
	}
	let css = renderCSS()
	let mainTitle = renderMainTitle(rows, column, parameter)
	let secondaryTitle = renderSecondaryTitle(rows, column, parameter)
	let content = `${css}
		<div class="zn-parent-info" style="text-align: ${parameter.alignment};">
			${mainTitle}
			${secondaryTitle}
		</div>
		`
	return content
}

function renderMainTitle(rows, column, parameter) {
	let mainTitle = `<div class="zn-main zn-main-info zn-${parameter.fontSize}">
		${parameter.showTitle ?
			`${column.key.length ? 
				`<p class="zn-main-header">${column.key[0].name.replace(/_/g, ' ')}</p>` : ''}`
		: ''}
		<p class="zn-main-value" ${parameter.fontColor ? `style="color: ${parameter.fontColor}"` : ''}>
			${parameter.iconName ? `<i class="fa fa-${parameter.iconName}"></i>` : ''}
			${parameter.prefix ? `${parameter.prefix}` : ''}
			${column.key.length ? `${rows[0][column.key[0].index]}` : `${rows[0][0]}`}
			${parameter.suffix ? `${parameter.suffix}` : ''}
		</p>
		</div>`
	return mainTitle
}

function renderSecondaryTitle(rows, column, parameter) {
	let secondaryTitle = ''
	if (column.aggregator.length > 0) {
		secondaryTitle = `<div class="zn-main zn-sub-info zn-${parameter.fontSize}">
			<p class="zn-sub-header">
				${column.aggregator[0].name.replace(/_/g, ' ')} 
				<span class="zn-sub-value"> 
					${rows[0][column.aggregator[0].index]} 
				</span>
			</p>
      </div>`
	}
	return secondaryTitle
}


function renderCSS() {
	let styleContent = `
		<style>
		
		.zn-parent-info {
			margin-top: 20px;
		}

		.zn-main-info {
			width: 100%;
			background-color: white;
		}

		.zn-main-header {
			margin: 0;
			font-size: 34px;
			text-transform: capitalize;
			color: rgb(68, 81, 80);
		}

		.zn-main-value {
			margin: 0;
			font-size: 72px;
			color: #ED6985;
		}

		.zn-sub-info {
			width: 100%;
			color: rgb(163, 163, 163);
			border-top: solid 1px #ccc;
		}

		.zn-sub-header {
			margin-top: 15px;
			font-size: xx-large;
			text-transform: capitalize;
		}

		.zn-sub-value {
			padding-left: 20px;
			margin-top: 15px;
			font-size: xx-large;
			font-weight: bold;
		}

		.zn-large .zn-main-header {
			font-size: 2.3vw;
		}

		.zn-large .zn-sub-header {
			font-size: 2.3vw;
		}

		.zn-large .zn-sub-value {
			font-size: 2.3vw;
		}

		.zn-large .zn-main-value {
			font-size: 5vw;
		}

		.zn-medium .zn-main-header {
			font-size: 1.7vw;
		}

		.zn-medium .zn-sub-header {
			font-size: 1.7vw;
		}

		.zn-medium .zn-sub-value {
			font-size: 1.7vw;
		}

		.zn-medium .zn-main-value {
			font-size: 3vw;
		}

		.zn-small .zn-main-header {
			font-size: 1.2vw;
		}

		.zn-small .zn-sub-header {
			font-size: 1.2vw;
		}

		.zn-small .zn-sub-value {
			font-size: 1.2vw;
		}

		.zn-small .zn-main-value {
			font-size: 2vw;
		}
		</style>
		`
	return styleContent;
}

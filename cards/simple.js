export function renderSimpleCard(rows, column, parameter) {
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
	let mainValue = '-'
	let mainIndex = 0
	if (column.key.length > 0) {
		mainIndex = column.key[0].index
	}
	if (rows.length > 0 && rows[0].length > mainIndex) {
		mainValue = rows[0][mainIndex]
	}
	let mainTitle = `<div class="zn-main zn-main-info zn-${parameter.fontSize}">
		${parameter.showTitle ?
			`${column.key.length ?
				`<p class="zn-main-header">${column.key[0].name.replace(/_/g, ' ')}</p>` : ''}`
			: ''}
		<p class="zn-main-value" ${parameter.fontColor ? `style="color: ${parameter.fontColor}"` : ''}>
			${parameter.iconName ? `<i class="fa fa-${parameter.iconName}"></i>` : ''}
			${parameter.prefix ? `${parameter.prefix}` : ''}
			${mainValue}
			${parameter.suffix ? `${parameter.suffix}` : ''}
		</p>
		</div>`
	return mainTitle
}

function renderSecondaryTitle(rows, column, parameter) {
	let secondaryTitle = '<div class="zn-main zn-sub-info zn-${parameter.fontSize}">'
	for (let i = 0; i < column.aggregator.length; i++) {
		let secondaryValue = '-'
		let secondaryIndex = column.aggregator[i].index
		if (rows.length > 0 && rows[0].length > secondaryIndex) {
			secondaryValue = rows[0][secondaryIndex]
		}
		secondaryTitle += `<p class="zn-sub-header">
				${column.aggregator[i].name.replace(/_/g, ' ')} 
				<span class="zn-sub-value"> 
					${secondaryValue}
				</span>
			</p>`
	}
	secondaryTitle += '</div>'
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

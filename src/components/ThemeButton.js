import React from 'react'
import styled from 'styled-components'

function ThemeSwitcher({ theme }) {


	return (
		<Style>
			<input type="checkbox" id="switch" onClick={theme} /><label htmlFor="switch">Toggle</label>
		</Style>
	)
}

const Style = styled.div`
    @media only screen and (min-width: 930px) {
	margin-left: 2rem;
	margin-top: .2rem;
}
input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 4rem;
	height: 2rem;
	background: grey;
	display: block;
	border-radius: 100px;
	position: relative;
}

label:after {
	content: '';
	position: absolute;
	top: 5px;
	left: 5px;
	width: 1.45rem;
	height: 1.45rem;
	background: #DEDEDE;
	border-radius: 90px;
	transition: 0.2s;
}

input:checked + label {
	background: #080808;
}

input:checked + label:after {
	left: calc(100% + -5%);
	transform: translateX(-100%);
}

label:active:after {
	 width: calc(100% - 10%);
}
`

export default ThemeSwitcher

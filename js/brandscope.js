//S20210810b3d249e9bb1e8,S2019101540e52034ea8e0,S202301022b2895af4900d,S20210810e84a9ee284854 - 테스트서버 사이트
//
// const VALID_SITE_CODES = [
// 	'S20210810b3d249e9bb1e8',
// 	'S2019101540e52034ea8e0',
// 	'S202301022b2895af4900d',
// 	'S20210810e84a9ee284854'
// ];

//if (VALID_SITE_CODES.includes(SITE_CODE)) { }

	// BrandScope 초기화 및 메서드 사용을 위한 래퍼 함수
;(
		function(window, document, script, BrandScope, firstScript){
			window.BrandScope = window.BrandScope || {
				init : function(){
					;(
							window.BrandScope.q = window.BrandScope.q || []
					).push(
							['init'].concat(Array.prototype.slice.call(arguments)),
					)
				},
				identify : function(){
					;(
							window.BrandScope.q = window.BrandScope.q || []
					).push(
							['identify'].concat(Array.prototype.slice.call(arguments)),
					)
				},
				track : function(){
					;(
							window.BrandScope.q = window.BrandScope.q || []
					).push(
							['track'].concat(Array.prototype.slice.call(arguments)),
					)
				},
				getImwebClientInfo: function () {
					;(
							window.BrandScope.q = window.BrandScope.q || []
					).push(
							['getImwebClientInfo'].concat(Array.prototype.slice.call(arguments)),
					)
				},
				sessionResetByLogout: function () {
					;(
							window.BrandScope.q = window.BrandScope.q || []
					).push(
							['sessionResetByLogout'].concat(Array.prototype.slice.call(arguments)),
					)
				},
			}

			// BrandScope SDK 스크립트 로드
			BrandScope = window.BrandScope
			// BrandScope 스크립트 동적 로딩
			script = document.createElement('script')
			script.type = 'module'
			script.async = true
			script.src = (typeof TEST_SERVER !== 'undefined' && TEST_SERVER)
					? '//cdn-brandscope.imtest.me/bs.esm.js'
					: '//static.imweb.me/brand-scope/bs.esm.js';
			// BrandScope 스크립트 삽입
			firstScript = document.getElementsByTagName('script')[0]
			firstScript.parentNode.insertBefore(script, firstScript)
		}
)(window, document);
BrandScope.init();


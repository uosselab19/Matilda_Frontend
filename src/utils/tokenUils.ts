//base 64를 디코딩한 후에 parse 과정을 통해 json화 하는 함수
//jwt-decode 안 쓰고, 맛깔나는 커스텀 함수를 통해 decode작업을 진행할 예정
export const getUserInfoByToken = (data: SigninResponse) => {
	const result = JSON.parse(Buffer.from(data.accessToken.split('.')[1], 'base64').toString());
	return {
		...result,
		accessToken: data.accessToken,
		refreshToken: data.refreshToken
	};
};
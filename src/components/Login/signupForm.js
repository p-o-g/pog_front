/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, emailDupl } from '../../axios/User';
import { setAccsstoken, setUser } from '../../reducers/user';
import './signup-form.scss';

const Index = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);
	const [info, setInfo] = useState({
		email: '',
		password: '',
		passwordCheck: '',
		nickname: '',
		phone: '',
		organization: '',
	});

	const [errorInfo, setErrorInfo] = useState({
		email: '',
		password: '',
		passwordCheck: '',
		nickname: '',
		phone: '',
		organization: '',
	});

	const checkForm = () => {
		if (info.password !== info.passwordCheck) return false;
		return true;
	};
	const emailDuplCheck = async () => {
		console.log(info.email);
		await emailDupl(info)
			.then((res) => {
				console.log(res.data);
				if (res.data.success) {
					setErrorInfo({ email: res.data.message });
				}
			})
			.catch((err) => {
				console.error(err);
				console.log(err.data);
			});
	};

	const signupSubmit = async () => {
		if (!checkForm()) {
			setErrorInfo({ passwordCheck: '  비밀번호가 일치하지 않습니다.' });
		} else {
			setErrorInfo({ passwordCheck: '' });
		}
		// if (info.email === '') {
		// 	setErrorInfo({ email: '   이메일을 입력해주세요.' });
		// } else {
		// 	setErrorInfo({ email: '' });
		// }
		// if (info.password === '') {
		// 	setErrorInfo({ password: '   비밀번호를 입력해주세요.' });
		// } else {
		// 	setErrorInfo({ password: '' });
		// }
		// if (info.nickname === '') {
		// 	setErrorInfo({ nickname: '   닉네임을 입력해주세요.' });
		// } else {
		// 	setErrorInfo({ nickname: '' });
		// }
		// if (info.phone === '') {
		// 	setErrorInfo({ phone: '    전화번호를 입력해주세요.' });
		// } else {
		// 	setErrorInfo({ phone: '' });
		// }

		await signup(info)
			.then((res) => {
				if (res.status === 200) {
					console.log(
						`[+] signup - res data: ${JSON.stringify(res.data.data)}`
					);
					dispatch(setUser(res.data.data.user));
					dispatch(setAccsstoken(res.data.data.accesstoken));
					console.log(`[+] signup - userState: ${JSON.stringify(userState)}`);
					navigate('/');
				} else if (res.status === 400) {
					console.log(res.message);
				} else if (res.status === 409) {
					alert(res.message);
				} else if (res.status === 412) {
					alert(res.message);
					console.error(res.message);
				} else if (res.status === 500) {
					alert(res.message);
					console.log(res.message);
				}
			})
			.catch((err) => {
				console.error(err);
				console.log(err.code, err.message);
			});
	};

	const handleChange = (e) => {
		const className = e.target.className;
		const value = e.target.value;
		if (className === 'email') {
			setInfo({ ...info, email: value });
			setTimeout(emailDuplCheck, 1000);
		} else if (className === 'password') {
			setInfo({ ...info, password: value });
		} else if (className === 'passwordCheck') {
			setInfo({ ...info, passwordCheck: value });
		} else if (className === 'organization') {
			setInfo({ ...info, organization: value });
		} else if (className === 'nickname') {
			setInfo({ ...info, nickname: value });
		} else if (className === 'phone') {
			setInfo({ ...info, phone: value });
		} else {
			console.err('[-] error from SignupForm');
		}
	};

	return (
		<div className="signup-form">
			<div className="form">
				<h3>P O G</h3>

				<div>
					<span className="label">이메일</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="email"
						type="email"
						placeholder="이메일을 입력해주세요. "
						value={info.email}
						onChange={handleChange}
					/>
					{/* <button className="check-button" onClick={emailDupl}>
						중복 확인
					</button> */}
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.email}
					</div>
				</div>
				<div>
					<span>비밀번호</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="password"
						type="password"
						placeholder="비밀먼호를 입력해주세요. "
						value={info.password}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.password}
					</div>
				</div>
				<div>
					<span>비밀번호 확인</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="passwordCheck"
						type="password"
						placeholder="비밀먼호를 한번 더 입력해주세요. "
						value={info.passwordCheck}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.passwordCheck}
					</div>
				</div>
				<div>
					<span>닉네임</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="nickname"
						type="nickname"
						placeholder="닉네임을 입력해주세요. "
						value={info.nickname}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.nickname}
					</div>
				</div>
				<div>
					<span>전화번호</span>
					<span style={{ color: 'red' }}> *</span>
					<input
						className="phone"
						type="phonenumber"
						placeholder="휴대폰 번호를 입력해주세요. "
						value={info.phone}
						onChange={handleChange}
					/>
					<div className="errorMessage" id="checkMess" style={{ color: 'red' }}>
						{errorInfo.phone}
					</div>
				</div>
				<div>
					<label>소속기관 (선택)</label>
					<input
						className="organization"
						type="text"
						placeholder="소속 기관을 입력해주세요. "
						value={info.organization}
						onChange={handleChange}
					/>
				</div>
				<button className="submit-button" onClick={signupSubmit}>
					회원가입
				</button>
			</div>
		</div>
	);
};

export default Index;

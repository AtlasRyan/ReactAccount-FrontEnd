import React, { useState, useEffect } from 'react';
import { get } from '@/utils';
import { Cell, FilePicker, Button  } from 'zarm';
import s from './style.module.less';
import { useNavigate } from 'react-router-dom';

const User = () => {
	const [user, setUser] = useState({});
	const [signature, setSignature] = useState('');
	const [show, setShow] = useState(false);
	const [avatar, setAvatar] = useState('');
	const navigate =  useNavigate();

	useEffect(() => {
	  getUserInfo();
	}, []);

	// 获取用户信息
	const getUserInfo = async () => {
	  const { data } = await get('/api/user/get_userinfo');
	  setUser(data);
	  setAvatar(data.avatar)
	};

	return <div className={s.user}>
		<div className={s.head}>
		   <div className={s.info}>
		     <span>昵称：{user.username || '--'}</span>
		     <span>
		       <img style={{ width: 30, height: 30, verticalAlign: '-10px' }} src="//s.yezgea02.com/1615973630132/geqian.png" alt="" />
		       <b>{user.signature || '暂无个签'}</b>
		     </span>
		   </div>
		   <img className={s.avatar} style={{ width: 60, height: 60, borderRadius: 8 }} src={user.avatar || ''} alt="" />
		</div>
		<div className={s.content}>
			<Cell
			  hasArrow
			  title="用户信息修改"
			  onClick={() => navigate('/userinfo')}
			  icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/gxqm.png" alt="" />}
			/>
			<Cell
			  hasArrow
			  title="重置密码"
			  onClick={() => navigate('/account')}
			  icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615974766264/zhaq.png" alt="" />}
			/>
			<Cell
			  hasArrow
			  title="关于"
			  onClick={() => navigate('/about')}
			  icon={<img style={{ width: 20, verticalAlign: '-7px' }} src="//s.yezgea02.com/1615975178434/lianxi.png" alt="" />}
			/>
    	</div>
	</div>
}

export default User
import React from 'react'
import { Cell, Input, Button, Checkbox,Toast } from 'zarm'
import Captcha from "react-captcha-code"
import { useState,useCallback,useRef ,useEffect} from 'react'
import cx from 'classnames'

import CustomIcon from '@/components/CustomIcon'
import { post } from '@/utils'
import s from './style.module.less'

const Login = () => {

  const captchaRef = useRef();
  const [type, setType] = useState('login'); // 登录注册类型
  const [user_name, setUsername] = useState(''); // 账号
  const [password, setPassword] = useState(''); // 密码
  const [password2, setPassword2] = useState(''); // 密码
  const [verify, setVerify] = useState(''); // 验证码
  const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值

  const onSubmit = async () => {


    if (!user_name) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    try {
      // 判断是否是登录状态
      if (type == 'login') {
        // 执行登录接口，获取 token
        const { data } = await post('/api/user/login', {
          user_name,
          password
        });
        console.log('data', data)
        // 将 token 写入 localStorage
        localStorage.setItem('token', data.token);
        window.location.href = '/'
      } else {
        if(password !== password2) {
          Toast.show('两次密码不一致')
          return
        }
        if (!verify) {
          Toast.show('请输入验证码')
          return
        };
        if (verify != captcha) {
          console.log(verify)
          console.log(captcha)
          Toast.show('验证码错误')
          return
        };
        if(!document.getElementById("agreement").checked) {
          Toast.show('请同意条款')
          return
        }
        const { data } = await post('/api/user/register', {
          user_name,
          password
        });
        Toast.show('注册成功');
        // 注册成功，自动将 tab 切换到 login 状态
        setType('login');
      }
    } catch (error) {
      Toast.show('系统错误');
    }
  };

  useEffect(() => {
    document.title = type == 'login' ? '登录' : '注册';
  }, [type])

  //  验证码变化，回调方法
  const handleChange = useCallback((captcha) => {
    //console.log('captcha', captcha)
    setCaptcha(captcha)
  }, []);

  return <div className={s.auth}>
    <div className={s.head} />
    <div className={s.tab}>
      <span className={cx({ [s.active]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      <span className={cx({ [s.active]: type == 'register' })} onClick={() => setType('register')}>注册</span>
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="zhanghao" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="mima" />}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
    {
      type == 'register' ?
      <Cell icon={<CustomIcon type="mima" />}>
      <Input
        clearable
        type="password"
        placeholder="请重新输入密码"
        onChange={(value) => setPassword2(value)}
      />
      </Cell> : null
    }
    {
      type == 'register' ?
      <Cell icon={<CustomIcon type="mima" />}>
        <Input
          clearable
          type="text"
          placeholder="请输入验证码"
          onChange={(value) => setVerify(value)}
        />
        <Captcha ref={captchaRef} charNum={4} onChange={handleChange} />
      </Cell> : null
    }
    </div>
    <div className={s.operation}>
    {
      type == 'register' ? <div className={s.agree}>
        <Checkbox id="agreement"/>
        <label className="text-light">阅读并同意<a>《条款》</a></label>
      </div> : null
    }
      <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
    </div>
  </div>
}

export default Login
let { proxy, revoke } = Proxy.revocable( {} ,{} );//返回一个可取消的proxy
proxy.foo = 123;
console.log( proxy.foo );//123
revoke();
console.log( proxy.foo );// TypeError: Revoked




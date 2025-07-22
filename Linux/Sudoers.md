
**sudoers**


Linux를 사용하다보면 root 권한으로 명령어를 실행하고 싶을 떄가 있다. 이 때는 sudo 커맨드를 사용하면되는데 모든 유저가 사용할 수 있는건 아니고 sudoers에 등록되어있어야한다.


sudoers는 `/etc/sudoers/`에 파일로 존재하고 여기에 사용자를 추가하는 것으로 sudoers에 추가할 수 있다. [참고](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_basic_system_settings/managing-sudo-access_configuring-basic-system-settings)


sudo 그룹에 사용자를 추가하는 것으로 sudoers로 만들 수도 있다.


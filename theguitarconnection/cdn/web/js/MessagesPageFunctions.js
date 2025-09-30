const subMenus = document.getElementById("subMenus");
const SideInfoSettingsBtn = document.getElementById("SideInfoSettingsBtn");

ChangeSubMenu(1);

SideInfoSettingsBtn.onclick = () => ChangeSubMenu(1);

function ChangeSubMenu(menu){
    const subMenusChildren = subMenus.children;

    for(let i = 0; i < subMenusChildren.length; i++){
        subMenusChildren[i].style.display = "none";
    }
    subMenusChildren[menu].style.display = "";
}
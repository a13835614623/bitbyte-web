import 'element-ui/lib/theme-chalk/display.css';
import Vue from 'vue'
import {
  Link,
  Pagination,
  Dialog,
  Breadcrumb,
  BreadcrumbItem,
  Autocomplete,
  Carousel,
  CarouselItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  Table,
  TableColumn,
  DatePicker,
  Form,
  FormItem,
  Tag,
  Alert,
  Icon,
  Row,
  Col,
  InfiniteScroll,
  Upload,
  Progress,
  Card,
  Notification,
  scrollbar,
  Steps,
  Step,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Tabs,
  TabPane,
  Collapse,
  CollapseItem,
  Popover
} from 'element-ui';
Vue.use(Tabs);
Vue.use(TabPane)
Vue.use(Collapse);
Vue.use(CollapseItem)
Vue.use(Breadcrumb);
Vue.use(Popover);
Vue.use(BreadcrumbItem);
Vue.use(Link);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(scrollbar);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tag);
Vue.use(Alert);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Progress);
Vue.use(Card);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Loading.directive);
Vue.use(InfiniteScroll);
// Vue.use(Notification);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
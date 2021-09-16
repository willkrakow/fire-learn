import { Dashboard } from "@material-ui/icons";
import {CourseTable} from "../../components/admin/course";

const routeConfig = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: Dashboard,
    component: () => import("./dashboard"),
    exact: true,
    subRoutes: [
      {
        title: "Courses",
        path: "/admin/courses",
        component: CourseTable,
        exact: true,
        subRoutes: [
          {
            title: "Course",
            path: "/admin/courses/:courseId",
            component: () => import("./courseManager/courseEditor"),
            subRoutes: [
              {
                title: "Lessons",
                path: "/admin/courses/:courseId/lessons",
                component: () => import("./lessonManager/lessonTable"),
                exact: true,
                subRoutes: [
                  {
                    title: "Lesson",
                    path: "/admin/courses/:courseId/lessons/:lessonId",
                    component: () =>
                      import("../../components/admin/lesson"),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Users",
        path: "/admin/users",
        component: () => import("./userManager"),
        exact: true,
        subRoutes: [
          {
            title: "User",
            path: "/admin/users/:userId",
            component: () => import("../../components/admin/userEditor"),
          },
        ],
      },
    ],
  },
];

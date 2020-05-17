import ProtectedService from './ProtectedServices';


const API_URL = `${process.env.REACT_APP_API_URL}/api/`;

class ProjectService extends ProtectedService {
  async list() {
    const request = await this.getRequest();
    let projects = [];
    await request
        .get(API_URL + "project")
        .then(response => {
            projects = response.data.projects;
        })
        .catch(err =>{
            console.log(err);
        });
    return projects
  }

  async find(projectId) {
    const request = await this.getRequest();
    let project = [];
    await request
        .get(`${API_URL}project/${projectId}`)
        .then(response => {
            project = response.data.project;
        })
        .catch(err =>{
            console.log(err);
        });
    return project
  }

  async create(title) {
    const request = await this.getRequest();
    let project = [];
    await request
        .post(API_URL + "project", {
            title,
            tasks: []
        })
        .then(response => {
            project = response.data.project;
        })
        .catch(err =>{
            console.log(err);
        });
    return project
  }

  async update(project, deleteTasks = []) {
    const request = await this.getRequest();
    let projectUpdated = [];
    await request
        .put(`${API_URL}project/${project._id}`, {
            title: project.title,
            tasks: project.tasks,
            deleteTasks
        }).then(response => {
            projectUpdated = response.data.project;
        })
        .catch(err =>{
            console.log(err);
        });
    return projectUpdated;
  }

  async delete(projectId) {
    const request = await this.getRequest();
    await request
        .delete(`${API_URL}project/${projectId}`)
        .then(response => {
            console.log("Project deleted with success.")
        })
        .catch(err =>{
            console.log(err);
        });
    return null;
  }
}

export default new ProjectService();
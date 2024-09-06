const GITHUB_ORG = process.env.GITHUB_ORG;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

let octokit;

(async () => {
  const { Octokit } = await import("octokit");
  octokit = new Octokit({
    auth: GITHUB_TOKEN,
  });
})();

async function inviteUserToOrg(email) {
  try {
    await octokit.request('POST /orgs/{org}/invitations', {
        org: GITHUB_ORG,
        email: email,
        role: 'direct_member',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
    return true;
  } catch (error) {
    console.error('邀请用户到组织失败:', error);
    return false;
  }
}

async function removeUserFromOrg(username) {
  try {
    await octokit.request('DELETE /orgs/{org}/memberships/{username}', {
        org: GITHUB_ORG,
        username: username,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    // await octokit.orgs.removeMember({
    //   org: GITHUB_ORG,
    //   username: username
    // });
    return true;
  } catch (error) {
    console.error('从组织移除用户失败:', error);
    return false;
  }
}

async function getUserByEmail(email) {
  try {
    const response = await octokit.search.users({
      q: `${email} in:email`
    });
    const users = response.data.items;
    return users.length > 0 ? users[0].login : null;
  } catch (error) {
    console.error('通过邮箱查找用户失败:', error);
    return null;
  }
}

module.exports = { inviteUserToOrg, removeUserFromOrg, getUserByEmail };
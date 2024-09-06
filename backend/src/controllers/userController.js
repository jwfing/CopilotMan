const User = require('../models/User');
const { inviteUserToOrg, removeUserFromOrg } = require('../services/githubService');

async function getAllUsers(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        res.json({
            users: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: '获取用户列表失败', error: error.message });
    }
}

async function registerUser(req, res) {
    try {
        const { corporateEmail, githubUsername, githubEmail } = req.body;

        const [user, created] = await User.findOrCreate({
            where: { corporateEmail },
            defaults: { githubUsername, githubEmail }
        });

        if (!created) {
            return res.status(400).json({ message: '该企业邮箱已注册' });
        }

        const invited = await inviteUserToOrg(githubEmail);
        if (invited) {
            user.isInvited = true;
            await user.save();
        }

        res.status(201).json({ message: '注册成功', isInvited: invited });
    } catch (error) {
        res.status(500).json({ message: '注册失败', error: error.message });
    }
}

async function reinviteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: '用户不存在' });
        }

        const invited = await inviteUserToOrg(user.githubEmail);
        if (invited) {
            user.isInvited = true;
            await user.save();
            res.json({ message: '邀请已重新发送', isInvited: true });
        } else {
            res.status(500).json({ message: '邀请发送失败' });
        }
    } catch (error) {
        res.status(500).json({ message: '操作失败', error: error.message });
    }
}

async function inviteUserByEmail(req, res) {
    try {
      const { email } = req.body;
      
      // 检查用户是否已存在
      let user = await User.findOne({ where: { corporateEmail: email } });
      if (user) {
        return res.status(400).json({ message: '用户已存在' });
      }
  
      // 邀请用户到 GitHub 组织
      const invited = await inviteUserToOrg(user.githubEmail);
      if (invited) {
        // 创建新用户记录
        user = await User.create({ corporateEmail: email });
        res.status(201).json({ message: '邀请已发送', user });
      } else {
        res.status(500).json({ message: '邀请用户失败' });
      }
    } catch (error) {
      console.error('邀请用户时发生错误:', error);
      res.status(500).json({ message: '邀请用户时发生错误', error: error.message });
    }
}

async function deleteUserById(req, res) {
    console.log("deleteUserById invoked...");
    const { id } = req.params;
    console.log("try to delete user with id: " + id);
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: '用户不存在' });
        }

        const removed = await removeUserFromOrg(user.githubUsername);
        if (!removed) {
            console.log('从组织移除用户失败');
        }
        await user.destroy();
        res.json({ message: '用户记录已成功删除' });
    } catch (error) {
        console.error('删除用户记录失败:', error);
        res.status(500).json({ message: '删除用户记录时发生错误' });
    }
}

async function removeUserByEmail(req, res) {
    try {
      const { corporateEmail } = req.body;
      
      const user = await User.findOne({ where: { corporateEmail } });
      if (!user) {
        return res.status(404).json({ message: '用户不存在' });
      }
  
      const removed = await removeUserFromOrg(user.githubUsername);
      if (removed) {
        await user.destroy();
        res.json({ message: '用户已从组织中移除' });
      } else {
        res.status(500).json({ message: '从组织移除用户失败' });
      }
    } catch (error) {
      res.status(500).json({ message: '操作失败', error: error.message });
    }
  }


module.exports = { getAllUsers, reinviteUser, registerUser, deleteUserById, removeUserByEmail, inviteUserByEmail };
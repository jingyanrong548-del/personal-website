#!/usr/bin/env node

/**
 * 版本号自动递增脚本
 * 按照语义化版本（SemVer）规则：MAJOR.MINOR.PATCH
 * 
 * 使用方法:
 *   node scripts/bump-version.js          # 自动增加 PATCH 版本 (1.0.0 -> 1.0.1)
 *   node scripts/bump-version.js patch    # 手动指定增加 PATCH
 *   node scripts/bump-version.js minor    # 增加 MINOR 版本 (1.0.0 -> 1.1.0)
 *   node scripts/bump-version.js major    # 增加 MAJOR 版本 (1.0.0 -> 2.0.0)
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const packageJsonPath = join(rootDir, 'package.json');

// 读取 package.json
function readPackageJson() {
    try {
        const content = readFileSync(packageJsonPath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('❌ 无法读取 package.json:', error.message);
        process.exit(1);
    }
}

// 写入 package.json
function writePackageJson(data) {
    try {
        const content = JSON.stringify(data, null, 2) + '\n';
        writeFileSync(packageJsonPath, content, 'utf-8');
    } catch (error) {
        console.error('❌ 无法写入 package.json:', error.message);
        process.exit(1);
    }
}

// 解析版本号
function parseVersion(version) {
    const parts = version.split('.').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
        throw new Error(`无效的版本号格式: ${version}`);
    }
    return {
        major: parts[0],
        minor: parts[1],
        patch: parts[2]
    };
}

// 增加版本号
function bumpVersion(currentVersion, type = 'patch') {
    const version = parseVersion(currentVersion);
    
    switch (type.toLowerCase()) {
        case 'major':
            version.major++;
            version.minor = 0;
            version.patch = 0;
            break;
        case 'minor':
            version.minor++;
            version.patch = 0;
            break;
        case 'patch':
        default:
            version.patch++;
            break;
    }
    
    return `${version.major}.${version.minor}.${version.patch}`;
}

// 主函数
function main() {
    const packageJson = readPackageJson();
    const currentVersion = packageJson.version;
    const bumpType = process.argv[2] || 'patch';
    
    if (!['major', 'minor', 'patch'].includes(bumpType.toLowerCase())) {
        console.error(`❌ 无效的版本类型: ${bumpType}`);
        console.error('   请使用: major, minor, 或 patch');
        process.exit(1);
    }
    
    const newVersion = bumpVersion(currentVersion, bumpType);
    
    // 更新 package.json
    packageJson.version = newVersion;
    writePackageJson(packageJson);
    
    console.log(`✅ 版本号已更新: ${currentVersion} -> ${newVersion} (${bumpType})`);
    
    return newVersion;
}

// 执行
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}

export { bumpVersion, parseVersion };
